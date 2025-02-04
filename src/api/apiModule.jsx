import axiosInstance from "./axiosInstance";

const apiModule = {
  fetchFirstDocs: async () => {
    const url = "/api/manage/apply";
    const tracks = ["all", "pm", "fe", "be"];

    try {
      const responses = await Promise.all(
        tracks.map((track) =>
          axiosInstance.get(url, {
            params: { track: track, page: 0, size: 200 },
          })
        )
      );
      const data = responses.map((response) => response.data.result);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },

  addToDocs: async (joinerIds) => {
    const url = "/api/manage/docs/add";
    try {
      const response = await axiosInstance.post(url, { joinerIds });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  fetchDocsResult: async () => {
    const url = "/api/manage/docs/result";
    const tracks = ["all", "pm", "fe", "be"];

    try {
      const responses = await Promise.all(
        tracks.map((track) => axiosInstance.get(url, { params: { track } }))
      );
      const data = responses.map((response) => response.data.result);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteDocsResult: async (joinerIds) => {
    const url = "/api/manage/docs/del";

    try {
      const response = await axiosInstance.delete(url, { data: { joinerIds } });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  fetchInterviewResults: async () => {
    const url = "/api/manage/interview/result";
    const tracks = ["all", "pm", "fe", "be"];

    try {
      const responses = await Promise.all(
        tracks.map((track) => axiosInstance.get(url, { params: { track } }))
      );
      const data = responses.map((response) => response.data.result);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },

  addInterview: async (joinerIds) => {
    const url = "/api/manage/interview/add";
    try {
      const response = await axiosInstance.post(url, { joinerIds });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteInterview: async (checkedItems) => {
    const url = "/api/manage/interview/del";
    const data = { joinerIds: checkedItems };

    try {
      await axiosInstance.delete(url, { data });
      return true;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },

  fetchQuestions: async () => {
    const url = "/api/manage/docs/quest";
    const year = "2024";
    const tracks = ["common", "pm", "fe", "be"];

    try {
      const responses = await Promise.all(
        tracks.map((track) =>
          axiosInstance.get(url, { params: { year, track } })
        )
      );
      const data = responses.map((response) => response.data.result);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },

  postQuestions: async (data) => {
    const url = "/api/manage/docs/quest";

    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteQuestion: async (id) => {
    const url = `/api/manage/docs/quest/${id}`;
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  fetchDocumentDetail: async (joinerId) => {
    const url = `/api/recruit/docs/${joinerId}`;
    try {
      const response = await axiosInstance.get(url);
      return response.data.result;
    } catch (err) {
      throw new Error(err);
    }
  },

  fetchInterviewTime: async (joinerId) => {
    const url = `/api/manage/interviewtime/${joinerId}`;
    try {
      const response = await axiosInstance.get(url);
      return response.data.result;
    } catch (err) {
      throw new Error(err);
    }
  },

  saveInterviewTime: async ({ interviewDate, interviewTime, joinerId }) => {
    const url = "/api/manage/interviewtime";
    try {
      const response = await axiosInstance.post(url, {
        interviewDate,
        interviewTime,
        joinerId,
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  updateQuestions: async (questionsData) => {
    const url = "/api/manage/docs/quests/";
    try {
      const response = await axiosInstance.put(url, questionsData);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
  initApplicant: async () => {
    const url = "/api/manage/apply/docs";
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
};

export default apiModule;
