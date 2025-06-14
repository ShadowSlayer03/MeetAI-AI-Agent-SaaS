import { authClient } from "./auth-client";

const onSocial = async (
  provider: "google" | "github",
  setPending: (value: boolean) => void,
  setError: (value: string | null) => void
) => {
  setPending(true);

  try {
    await authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/"
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        }
      }
    );
  } catch (err) {
    setPending(false);
    setError((err as Error).message);
  }
};

export default onSocial;