'use client';
import { useToast } from '@/components/toast/useToast';
import { startTransition, useActionState } from 'react';
import { type SafeParseReturnType, z, type ZodRawShape } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import type { BaseResponseApi } from '@/routes/main/dto/base.dto';

type PickSuccess<T> = T extends { success: true } ? T : never;
export function useApiAction<T, V>(
  apiCall: Awaited<(zodParseData: PickSuccess<SafeParseReturnType<T, T>>) => V>,
  options?: {
    validateSchema?: z.ZodObject<ZodRawShape, 'strip', z.ZodTypeAny, T, T>;
    disabledAutoEnqueueToast?: boolean;
    onSuccessMessage?: string;
    onErrorMessage?: string;
    onSuccess?: (data: BaseResponseApi<T>) => void;
    onError?: (data: BaseResponseApi<T>) => void;
  },
) {
  const { enqueueToasts } = useToast();
  const [data, action, isPending] = useActionState(handleApiCall, undefined);

  async function handleApiCall(_: unknown, FormData: FormData) {
    const formData = Object.fromEntries(FormData) as unknown as NoInfer<T>;
    const zodParseData = options?.validateSchema
      ? options.validateSchema.safeParse(formData)
      : {
          success: true as const,
          data: formData,
          error: undefined,
        };

    if (zodParseData.success) {
      const res = (await apiCall(zodParseData)) as BaseResponseApi<T>;

      if (!options?.disabledAutoEnqueueToast) {
        enqueueToasts([
          {
            message: res.success
              ? options?.onSuccessMessage || res.message
              : options?.onErrorMessage || res.message,
            color: res.success ? 'success' : 'danger',
            msg_id: uuidv4(),
            capitalize: true,
            timeout: 5000,
          },
        ]);
      }

      if (res.success) options?.onSuccess?.(res);
      if (!res.success) options?.onError?.(res);
    }
    return formData;
  }

  const mutation = () =>
    startTransition(() => {
      action(new FormData());
    });
  return { data, action, isPending, mutation };
}
