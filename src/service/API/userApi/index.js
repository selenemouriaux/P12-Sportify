import api from '../api';
import mockedApi from "../mockedApi";

const selectApi = source => {
  if (source === 'local') return mockedApi;
  if (source === 'API') return api;
}
export const userInfo = (source, userId, config) => {
  return selectApi(source).get(`${userId}`, config).then(res => res.data)
};

export const userActivity = (source, userId, config) => {
  return selectApi(source).get(`${userId}/activity`, config).then(res => res.data.data.sessions)
};

export const userAverageSessions = (source, userId, config) => {
  return selectApi(source).get(`${userId}/average-sessions`, config).then(res => res.data)
};

export const userPerformance = (source, userId, config) => {
  return selectApi(source).get(`${userId}/performance`, config).then(res => res.data)
};