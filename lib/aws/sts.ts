import { AssumeRoleCommand, STSClient } from "@aws-sdk/client-sts";
import { getPlaincostAwsConfig } from "@/lib/aws/config";

export type AssumedRoleCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration?: Date;
};

function getStsClient(): STSClient {
  const config = getPlaincostAwsConfig();

  if (!config) {
    throw new Error(
      "PlainCost AWS credentials are not configured. Set PLAINCOST_AWS_ACCESS_KEY_ID, PLAINCOST_AWS_SECRET_ACCESS_KEY, and PLAINCOST_AWS_ACCOUNT_ID.",
    );
  }

  return new STSClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

export async function assumeCustomerRole(params: {
  roleArn: string;
  externalId: string;
  sessionName: string;
}): Promise<AssumedRoleCredentials> {
  const client = getStsClient();
  const response = await client.send(
    new AssumeRoleCommand({
      RoleArn: params.roleArn,
      RoleSessionName: params.sessionName.slice(0, 64),
      ExternalId: params.externalId,
      DurationSeconds: 900,
    }),
  );

  const credentials = response.Credentials;

  if (
    !credentials?.AccessKeyId ||
    !credentials.SecretAccessKey ||
    !credentials.SessionToken
  ) {
    throw new Error("STS did not return temporary credentials.");
  }

  return {
    accessKeyId: credentials.AccessKeyId,
    secretAccessKey: credentials.SecretAccessKey,
    sessionToken: credentials.SessionToken,
    expiration: credentials.Expiration,
  };
}

export function parseAwsAccountIdFromRoleArn(roleArn: string): string | null {
  const match = /^arn:aws:iam::(\d{12}):role\/.+$/.exec(roleArn.trim());

  return match?.[1] ?? null;
}