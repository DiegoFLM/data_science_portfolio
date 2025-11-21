'use client';

import { useState } from 'react';
import { makePrediction } from '@/lib/api';
import { PredictionOutput } from '@/lib/types';

interface ModelDemoProps {
  modelEndpoint: string;
}

// Feature configurations for different models
const modelFeatures: Record<string, Array<{ name: string; label: string; min: number; max: number; default: number; step?: number }>> = {
  churn: [
    { name: 'tenure', label: 'Months with Company', min: 0, max: 72, default: 24 },
    { name: 'monthly_charges', label: 'Monthly Charges ($)', min: 20, max: 120, default: 65.5, step: 0.5 },
    { name: 'total_charges', label: 'Total Charges ($)', min: 20, max: 8500, default: 1572, step: 10 },
    { name: 'contract_type', label: 'Contract Type', min: 0, max: 2, default: 1 },
    { name: 'payment_method', label: 'Payment Method', min: 0, max: 3, default: 2 },
  ],
  time_series: [
    { name: 'hour', label: 'Hour of Day', min: 0, max: 23, default: 14 },
    { name: 'day_of_week', label: 'Day of Week', min: 0, max: 6, default: 2 },
    { name: 'temperature', label: 'Temperature (°C)', min: 15, max: 35, default: 25, step: 0.5 },
    { name: 'humidity', label: 'Humidity (%)', min: 30, max: 90, default: 60 },
    { name: 'is_holiday', label: 'Is Holiday', min: 0, max: 1, default: 0 },
  ],
};

export default function ModelDemo({ modelEndpoint }: ModelDemoProps) {
  const features = modelFeatures[modelEndpoint] || [];
  const [inputs, setInputs] = useState<Record<string, number>>(
    features.reduce((acc, f) => ({ ...acc, [f.name]: f.default }), {})
  );
  const [prediction, setPrediction] = useState<PredictionOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await makePrediction(modelEndpoint, { features: inputs });
      setPrediction(result);
    } catch (err) {
      setError('Failed to get prediction. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: number) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  if (features.length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          Demo not available for this model yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Try the Model
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.name}>
              <label
                htmlFor={feature.name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {feature.label}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id={feature.name}
                  min={feature.min}
                  max={feature.max}
                  step={feature.step || 1}
                  value={inputs[feature.name]}
                  onChange={(e) => handleInputChange(feature.name, parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <input
                  type="number"
                  min={feature.min}
                  max={feature.max}
                  step={feature.step || 1}
                  value={inputs[feature.name]}
                  onChange={(e) => handleInputChange(feature.name, parseFloat(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Predicting...' : 'Get Prediction'}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {prediction && (
        <div className="mt-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6">
          <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Prediction Result
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Prediction</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {prediction.prediction}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Probability</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {(prediction.probability * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Confidence</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {prediction.confidence}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Model</p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {prediction.model_name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
