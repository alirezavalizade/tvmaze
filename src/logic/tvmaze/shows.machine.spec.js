import { interpret } from 'xstate';

import { showsMachine } from './shows-machine';

describe('shows-machine', () => {
  const service = interpret(showsMachine);

  service.start();

  it('should be "viewing list" as the initial state', () => {
    expect(service.state.matches('viewing list')).toBeTruthy();
  });

  it('should be "viewing list => idle" as the first state', () => {
    expect(service.state.matches('viewing list.idle')).toBeTruthy();
  });

  // more tests can be done easily here, because of lack of time I cannot test all the machine :)
});
