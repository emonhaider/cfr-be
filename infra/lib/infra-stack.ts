import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { AuthorizationType, Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { AssetCode, Runtime, Function, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // This table was created manually, therefore we are importing here
    const dynamodbTable = Table.fromTableName(this, 'CFR', 'dynamo');

    const bucket = Bucket.fromBucketName(this, 'imported-bucket', 'mancomm-exercise');

    const layer = new LayerVersion(this, 'cfr-layer', {
      code: new AssetCode('../dist/layer'),
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      description: 'shared layered version',
    });

    const application = new Function(this, `CFRApiFunction`, {
      code: new AssetCode('../dist/apps/api'),
      handler: 'src/lambda.handler',
      runtime: Runtime.NODEJS_18_X,
      environment: {
        LOGGING_LEVEL: 'debug',
        NODE_ENV: 'development',
        TABLE_NAME: dynamodbTable.tableName,
      },
      timeout: Duration.seconds(300),
      memorySize: 512,
      functionName: `CRF-Api-Function`,
      layers: [layer],
    });

    dynamodbTable.grantReadWriteData(application);
    bucket.grantReadWrite(application);

    const restApiGw = new RestApi(this, 'RestApi', {
      restApiName: `CFR-Api`,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: [...Cors.DEFAULT_HEADERS, 'Cache-Control'],
      },
    });

    const healthCheckResource = restApiGw.root.addResource('health-check');
    healthCheckResource.addMethod('GET', new LambdaIntegration(application), {
      authorizationType: AuthorizationType.NONE,
    });

    const proxyResrouce = restApiGw.root.addResource('{proxy+}');
    proxyResrouce.addMethod('ANY', new LambdaIntegration(application), {
      authorizationType: AuthorizationType.NONE,
    });
  }
}
