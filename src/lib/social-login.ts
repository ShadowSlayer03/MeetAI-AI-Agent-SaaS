import { authClient } from "./auth-client";

const onSocial = async (
  provider: "google" | "github",
  setPending: (value: boolean) => void,
  setError: (value: string | null) => void
) => {
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
};

export default onSocial;