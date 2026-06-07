export const getStudentProfile = () => {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("studentProfile");
  return data ? JSON.parse(data) : null;
};

export const setStudentProfile = (profile) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("studentProfile", JSON.stringify(profile));
};