const API_BASE_URL = "http://127.0.0.1:8000";

export async function predictImage(
  file: File,
  modelName: string
) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/predict/image/?model_name=${modelName}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}

export interface Model {
  name: string;
  description?: string;
}

export async function fetchModels(): Promise<Model[]> {
  const response = await fetch(`${API_BASE_URL}/models`);
  if (!response.ok) {
    throw new Error("Failed to fetch models");
  }
  return response.json() as Promise<Model[]>; // ✅ Tell TS this is Model[]
}
