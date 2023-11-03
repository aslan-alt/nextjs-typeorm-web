export default function Component() {
  return (
    <>
      Not signed in <br />
      <a
        href={`https://github.com/login/oauth/authorize?client_id=Iv1.2a1db83cc737403b&redirect_uri=http://localhost:3000/api/v1/authCallback&scope=user:email`}
      >
        <button>Sign in</button>
      </a>
    </>
  );
}
