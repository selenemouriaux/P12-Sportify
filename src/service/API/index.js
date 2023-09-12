import axios from "axios"

const axiosParams = { baseURL: "http://localhost:3001/user/" }
const mockedParams = { baseURL: "" }

const axiosInstance = axios.create(axiosParams)
const mockedInstance = axios.create(mockedParams)

const APIcall = (axios) => {
  return {
    get: (url, config = {}) => axios.get(url, config),
  }
}

const API = APIcall(axiosInstance)
const mockedAPI = APIcall(mockedInstance)

function isOnline(source) {
  if (source === "local") return false
  if (source === "API") return true
}

export const userInfo = (source, userId, config) => {
  if (isOnline(source)) {
    return API.get(`${userId}`, config).then((res) => res.data)
  }
  return mockedAPI.get("/data.json").then((res) => ({
    data: res.data.USER_MAIN_DATA.filter((e) => e.id === userId)[0],
  }))
}

export const userActivity = (source, userId, config) => {
  if (isOnline(source))
    return API.get(`${userId}/activity`, config).then(
      (res) => res.data.data.sessions
    )
  return mockedAPI
    .get("/data.json")
    .then(
      (res) =>
        res.data.USER_ACTIVITY.filter((e) => e.userId === userId)[0].sessions
    )
}

export const userAverageSessions = (source, userId, config) => {
  if (isOnline(source))
    return API.get(`${userId}/average-sessions`, config).then(
      (res) => res.data.data.sessions
    )
  return mockedAPI
    .get("/data.json")
    .then(
      (res) =>
        res.data.USER_AVERAGE_SESSIONS.filter((e) => e.userId === userId)[0]
          .sessions
    )
}

export const userPerformance = (source, userId, config) => {
  if (isOnline(source))
    return API.get(`${userId}/performance`, config).then((res) => res.data.data)
  return mockedAPI
    .get("/data.json")
    .then(
      (res) => res.data.USER_PERFORMANCE.filter((e) => e.userId === userId)[0]
    )
}
