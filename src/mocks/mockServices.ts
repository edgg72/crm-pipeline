type ServiceResult = { ok: boolean; details?: string };

const BASE_DELAY = 400;
const RANDOM_DELAY = 300;
const BASE_SCORE = 50;
const SCORE_NATIONAL_OK = 30;
const SCORE_JUDICIAL_OK = 30;
const MAX_SCORE = 100;

const simulateLatency = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

const isNationalRegistryFlagged = (nationalId: string): boolean =>
  nationalId.endsWith("1") ||
  nationalId.endsWith("3") ||
  nationalId.endsWith("5");

const hasJudicialRecordFlag = (nationalId: string): boolean =>
  nationalId.endsWith("2") ||
  nationalId.endsWith("4") ||
  nationalId.endsWith("6");

export const checkNationalRegistry = async (
  nationalId: string
): Promise<ServiceResult> => {
  await simulateLatency(BASE_DELAY + Math.random() * RANDOM_DELAY);
  if (isNationalRegistryFlagged(nationalId))
    return { ok: true, details: "Found in registry" };
  return { ok: false, details: "Not found or mismatch" };
};

export  const  checkJudicialRecord = async(
  nationalId: string
): Promise<ServiceResult> => {
  await simulateLatency(BASE_DELAY + Math.random() * RANDOM_DELAY);
  if (!hasJudicialRecordFlag(nationalId))
    return { ok: true, details: "No records" };
  return { ok: false, details: "Has judicial records" };
}

export async function qualificationScore(inputs: {
  national: ServiceResult;
  judicial: ServiceResult;
  nationalId: string;
}) {
  await simulateLatency(BASE_DELAY + Math.random() * RANDOM_DELAY);
  let score = BASE_SCORE;
  if (inputs.national.ok) score += SCORE_NATIONAL_OK;
  if (inputs.judicial.ok) score += SCORE_JUDICIAL_OK;
  if (score > MAX_SCORE) score = MAX_SCORE;
  return { score };
}
