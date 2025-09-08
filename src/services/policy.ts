import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface QuestionRequest {
  question: string;
  context?: any;
}

export interface AgentResponse {
  answer: string;
  sources?: string[];
  context?: any;
}

export const policyService = {
  uploadPolicy: async (file: File): Promise<{ message: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  askQuestion: async (request: QuestionRequest): Promise<AgentResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/ask`, request);
    return response.data;
  },
};
