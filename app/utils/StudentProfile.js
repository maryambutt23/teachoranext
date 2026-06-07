export const getStudentProfile = () => {
  const data = localStorage.getItem("studentProfile");
  return data ? JSON.parse(data) : null;
};

export const setStudentProfile = (profile) => {
  localStorage.setItem("studentProfile", JSON.stringify(profile));
};