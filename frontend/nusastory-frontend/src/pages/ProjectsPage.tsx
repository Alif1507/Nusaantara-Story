import { useAuthToken } from "../auth/AuthContextToken";

const ProjectsPage = () => {
  const { user, logout } = useAuthToken();

  return (
    <div>
      You are Login
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <strong>Hi {user?.name}</strong>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default ProjectsPage;
