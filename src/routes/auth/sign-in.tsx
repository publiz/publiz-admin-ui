import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { FileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type SignInSchemaPayload = z.infer<typeof signInSchema>;

const SignIn: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignInSchemaPayload>({
    resolver: zodResolver(signInSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const auth = useAuth();

  const mutationSignIn = useMutation({
    mutationFn: ({ email, password }: SignInSchemaPayload) => {
      return auth.signIn({ email, password });
    },
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSignIn = (payload: SignInSchemaPayload) => {
    mutationSignIn.mutate(payload);
  };
  if (!auth.authInitializing && auth.token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="https://source.unsplash.com/IXUM4cJynP0/400x800"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="https://source.unsplash.com/IXUM4cJynP0/800x800"
              alt="Office"
            />
          </div>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex items-center justify-center p-6 sm:p-12 md:w-1/2"
          >
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">Email</span>
                <input
                  type="email"
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  placeholder="hello@fibotree.com"
                  {...register("email")}
                />
              </label>
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Password
                </span>
                <input
                  type="password"
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  placeholder="***************"
                  {...register("password")}
                />
              </label>
              <button
                disabled={!isValid || mutationSignIn.isPending}
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Route = new FileRoute("/auth/sign-in").createRoute({
  component: SignIn,
});
