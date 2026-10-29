
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { userContainer } from "../../src/features/user/di/user.container";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const user = await userContainer.registerUserUseCase.execute({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      // Guardar únicamente los datos básicos del usuario.
      sessionStorage.setItem(
        "fitroutine_user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );

      router.replace("/application");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al crear la cuenta."
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
            <h1 className="text-3xl font-bold">Crear cuenta</h1>
            <p className="mt-2 text-base-content/70">
              Regístrate para comenzar a organizar tus rutinas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <fieldset className="fieldset">
              <label htmlFor="name" className="fieldset-legend">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                className="input w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="email" className="fieldset-legend">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                className="input w-full"
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
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
                className="input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                disabled={isLoading}
              />
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="confirmPassword" className="fieldset-legend">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
                className="input w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
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
                  Creando cuenta...
                </>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>

          <div className="divider">O</div>

          <p className="text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="link link-primary font-semibold"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
