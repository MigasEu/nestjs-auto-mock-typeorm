import { ClassProvider, DynamicModule, FactoryProvider, ForwardReference, Provider, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MockedTest,
  ProviderMetadataTransformCheck,
  ProviderMetadataTransformFactory,
  ProviderMetadataTransformFactoryCustom,
} from 'nestjs-auto-mock';
import { Repository } from 'typeorm';

export const repositoryProviderCheck: ProviderMetadataTransformCheck = <T>(
  providerToMock: Provider<T>,
  metadataModuleMetadata: Type<T> | DynamicModule | Promise<DynamicModule> | ForwardReference,
) => {
  const dynamicModule = metadataModuleMetadata as DynamicModule;

  return dynamicModule.module?.name === TypeOrmModule.name && 'targetEntitySchema' in providerToMock;
};

export const repositoryProviderFactory: ProviderMetadataTransformFactory = <T>(providerToMock: Provider<T>) => {
  const providerFactory = providerToMock as FactoryProvider;

  const cleanedProviderToMock: FactoryProvider<T> = {
    ...providerToMock,
    useFactory: undefined,
  } as FactoryProvider<T>;

  return {
    ...cleanedProviderToMock,
    provide: providerFactory.provide,
    useClass: Repository,
  } as ClassProvider;
};

export const repositoryCustomProvider: ProviderMetadataTransformFactoryCustom = {
  check: repositoryProviderCheck,
  providerFunction: repositoryProviderFactory,
};

export const init = <T extends typeof MockedTest>(mockedTest: T = MockedTest as T) =>
  mockedTest.addCustomProviderMetadataTransformFactoryCustom(repositoryCustomProvider);
