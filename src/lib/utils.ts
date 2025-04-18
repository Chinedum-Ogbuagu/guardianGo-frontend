import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from "axios";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type ServerError = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
};

type ApiError = AxiosError<ServerError>;

export type IRQueryOptions<T> = UseQueryOptions<T, ApiError>;

// export type RQueryOptions<T> = Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn">;
export type RQueryOptions<T> = Omit<
  UseQueryOptions<T, ApiError, T, unknown[]>,
  "queryKey" | "queryFn"
>;

export type RMutationOptions<TData, TVariables, TError = ApiError> = UseMutationOptions<
  TData,
  TError,
  TVariables
>;
