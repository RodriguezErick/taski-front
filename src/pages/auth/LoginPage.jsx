import Login from "../../components/auth/Login";

function LoginPage() {
  return (
    <div>
      <Login />
      <p className="text-taski-placeholder underline p-1 hover:cursor-pointer hover:text-taski-secondary">
        Sign Up
      </p>
    </div>
  );
}
export default LoginPage;
