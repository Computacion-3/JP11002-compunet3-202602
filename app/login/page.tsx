
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { userContainer } from "../../src/features/user/di/user.container";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Completa el correo y la contraseña.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const user = await userContainer.loginUserUseCase.execute({
        email: email.trim(),
        password,
      });

      // Guardar información básica del usuario para la sesión de la interfaz.
      // No almacenar la contraseña.
      sessionStorage.setItem(
        "fitroutine_user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );

      router.replace("/routines");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al iniciar sesión."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-base-200 px-4 py-10">
      <section className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body gap-5 p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Bienvenido</h1>
            <p className="mt-2 text-base-content/70">
              Inicia sesión para organizar tus rutinas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <fieldset className="fieldset">
              <label htmlFor="email" className="fieldset-legend">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                className={`input w-full ${
                  error && !email.trim() ? "input-error" : ""
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="password" className="fieldset-legend">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Tu contraseña"
                className={`input w-full ${
                  error && !password ? "input-error" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </fieldset>

            {error && (
              <p role="alert" className="text-sm text-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-2 w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <div className="divider">O</div>

          <p className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="link link-primary font-semibold"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
