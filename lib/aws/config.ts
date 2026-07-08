export type PlaincostAwsConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  accountId: string;
};

export function getPlaincostAwsConfig(): PlaincostAwsConfig | null {
  const accessKeyId = process.env.PLAINCOST_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.PLAINCOST_AWS_SECRET_ACCESS_KEY;
  const accountId =
    process.env.PLAINCOST_AWS_ACCOUNT_ID ??
    process.env.NEXT_PUBLIC_PLAINCOST_AWS_ACCOUNT_ID;

  if (!accessKeyId || !secretAccessKey || !accountId) {
    return null;
  }

  return { accessKeyId, secretAccessKey, accountId };
}

export function getPublicPlaincostAwsAccountId(): string | null {
  return (
    process.env.NEXT_PUBLIC_PLAINCOST_AWS_ACCOUNT_ID ??
    process.env.PLAINCOST_AWS_ACCOUNT_ID ??
    null
  );
}