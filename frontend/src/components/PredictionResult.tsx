interface Props {
  result: {
    model_name: string;
    input_type: string;
    prediction: string;
    confidence: number;
  };
}

export default function PredictionResult({ result }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-center shadow-sm">
      <p className="text-xl font-semibold text-gray-800">
        {result.prediction}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Confidence: {(result.confidence * 100).toFixed(2)}%
      </p>

      <div className="mt-3 bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${result.confidence * 100}%` }}
        />
      </div>
    </div>
  );
}

