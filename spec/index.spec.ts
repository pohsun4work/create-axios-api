import { afterAll, afterEach, beforeAll, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { mockApis } from './mock/mock-apis';
import { resetMockData, server } from './mock/mock-server';

import type { FindQueryType, IdPathType, MockDataType } from './mock/mock-apis';
import type { AxiosResponse } from 'axios';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  resetMockData();
  server.restoreHandlers();
  vi.restoreAllMocks();
});
afterAll(() => server.close());

it('mockApis existing', () => {
  expect(mockApis).toBeDefined();
  expect(Object.keys(mockApis)).toHaveLength(5);
});

describe('`find` function', () => {
  const find = vi.fn(() => mockApis.find({}));

  it('exist', () => {
    expect(mockApis).toHaveProperty('find');
    expect(mockApis.find).toBeDefined();
  });

  it('can execute', async () => {
    const result = await find();
    expect(find).toBeCalled();
    expect(result).toBeDefined();
  });

  it('has right type', async () => {
    expectTypeOf(mockApis.find).toBeFunction();
    expectTypeOf(mockApis.find).parameters.toEqualTypeOf<[FindQueryType]>();
    expectTypeOf(mockApis.find).returns.resolves.toBeObject();
    expectTypeOf(mockApis.find).returns.resolves.toHaveProperty('data');

    const result = await find();
    expectTypeOf(result).toEqualTypeOf<AxiosResponse<MockDataType[], any>>();
  });
});

describe('`findById` function', () => {
  const findById = vi.fn(() => mockApis.findById({ id: '1' }));

  it('exist', () => {
    expect(mockApis).toHaveProperty('findById');
    expect(mockApis.findById).toBeDefined();
  });

  it('can execute', async () => {
    const result = await findById();
    expect(findById).toBeCalled();
    expect(result).toBeDefined();
  });

  it('has right type', async () => {
    expectTypeOf(mockApis.findById).toBeFunction();
    expectTypeOf(mockApis.findById).parameters.toEqualTypeOf<[IdPathType]>();
    expectTypeOf(mockApis.findById).returns.resolves.toBeObject();
    expectTypeOf(mockApis.findById).returns.resolves.toHaveProperty('data');

    const result = await findById();
    expectTypeOf(result).toEqualTypeOf<AxiosResponse<MockDataType, any>>();
  });
});

describe('`add` function', () => {
  const add = vi.fn(() => mockApis.add({
    name: 'testing',
    color: 'red',
    price: 10,
    quantity: 1,
    unit: 'Piece',
  }));

  it('exist', () => {
    expect(mockApis).toHaveProperty('add');
    expect(mockApis.add).toBeDefined();
  });

  it('can execute', async () => {
    const result = await add();
    expect(add).toBeCalled();
    expect(result).toBeDefined();
  });

  it('has right type', async () => {
    expectTypeOf(mockApis.add).toBeFunction();
    expectTypeOf(mockApis.add).parameters.toEqualTypeOf<[Omit<MockDataType, 'id'>]>();
    expectTypeOf(mockApis.add).returns.resolves.toBeObject();
    expectTypeOf(mockApis.add).returns.resolves.toHaveProperty('data');

    const result = await add();
    expectTypeOf(result).toEqualTypeOf<AxiosResponse<MockDataType, any>>();
  });
});

describe('`update` function', () => {
  const update = vi.fn(() => mockApis.update({ id: '1' }, { name: 'new name' }));

  it('exist', () => {
    expect(mockApis).toHaveProperty('update');
    expect(mockApis.update).toBeDefined();
  });

  it('can execute', async () => {
    const result = await update();
    expect(update).toBeCalled();
    expect(result).toBeDefined();
  });

  it('has right type', async () => {
    expectTypeOf(mockApis.update).toBeFunction();
    expectTypeOf(mockApis.update).parameters.toEqualTypeOf<[IdPathType, Partial<Omit<MockDataType, 'id'>>]>();
    expectTypeOf(mockApis.update).returns.resolves.toBeObject();
    expectTypeOf(mockApis.update).returns.resolves.toHaveProperty('data');

    const result = await update();
    expectTypeOf(result).toEqualTypeOf<AxiosResponse<unknown, any>>();
  });
});

describe('`remove` function', () => {
  const remove = vi.fn(() => mockApis.remove({ id: '1' }));

  it('exist', () => {
    expect(mockApis).toHaveProperty('remove');
    expect(mockApis.remove).toBeDefined();
  });

  it('can execute', async () => {
    const result = await remove();
    expect(remove).toBeCalled();
    expect(result).toBeDefined();
  });

  it('has right type', async () => {
    expectTypeOf(mockApis.remove).toBeFunction();
    expectTypeOf(mockApis.remove).parameters.toEqualTypeOf<[IdPathType]>();
    expectTypeOf(mockApis.remove).returns.resolves.toBeObject();
    expectTypeOf(mockApis.remove).returns.resolves.toHaveProperty('data');

    const result = await remove();
    expectTypeOf(result).toEqualTypeOf<AxiosResponse<unknown, any>>();
  });
});
