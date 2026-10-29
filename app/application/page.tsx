
"use client";

import { useEffect, useState } from "react";
import { routineContainer } from "../../src/features/routines/di/routine.container";
import type { Routine } from "../../src/features/routines/domain/entities/routine";

const categoryStyles: Record<string, string> = {
  Fuerza: "bg-purple-100 text-purple-700",
  Hipertrofia: "bg-pink-100 text-pink-700",
  Resistencia: "bg-green-100 text-green-700",
};

const defaultRoutines = [
  {
    name: "Pierna pesada",
    description: "Sentadilla, peso muerto y zancadas",
    category: "Fuerza",
  },
  {
    name: "Torso y brazos",
    description: "Press banca, remo y dominadas",
    category: "Hipertrofia",
  },
  {
    name: "Cardio suave",
    description: "Bicicleta y caminata inclinada",
    category: "Resistencia",
  },
];

export default function RoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRoutines() {
      try {
        const result = await routineContainer.getRoutines.execute();
        setRoutines(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar las rutinas."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadRoutines();
  }, []);

  return (
    <main className="min-h-screen bg-base-200 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            GymRoutines
          </h1>
    
        </header>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div role="alert" className="alert alert-error">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && routines.length === 0 && (
          <div className="rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
            <h2 className="text-xl font-semibold">
              No hay rutinas disponibles
            </h2>
            <p className="mt-2 text-base-content/60">
              Cuando agregues rutinas, aparecerán aquí.
            </p>
          </div>
        )}

        {/* Routine cards */}
        {!isLoading && !error && routines.length > 0 && (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {routines.map((routine, index) => {
              const categories = [
                "Fuerza",
                "Hipertrofia",
                "Resistencia",
              ];

              return (
                <article
                  key={routine.id}
                  className="card border border-base-300 bg-base-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="card-body gap-3">
                    <h2 className="card-title text-xl">
                      {routine.name}
                    </h2>

                    <p className="text-base-content/70">
                      {routine.description || "Sin descripción disponible."}
                    </p>

                    <div className="card-actions justify-start pt-2">
                      <div className="badge badge-primary badge-outline">
                        {categories[index % categories.length]}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
