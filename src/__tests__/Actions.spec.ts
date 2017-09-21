import Action from '../Action';
import Actions from '../Actions';
import { actionFullSpecs, actionSpecs } from './fixtures/actionFixtures';

describe('Actions', () => {
  let actions = null;

  beforeEach(() => {
    actions = new Actions();
  });

  it('should have all interface methods', () => {
    expect(actions.addAction).toBeDefined();
    expect(actions.getAction).toBeDefined();
    expect(actions.getActions).toBeDefined();
    expect(actions.hasAction).toBeDefined();
  });

  describe('addAction', () => {

    it('should add action using action spec', () => {
      const spec = actionSpecs.ping;

      actions.addAction(spec);
      expect(actions.hasAction(spec.name)).toBe(true);
      expect(actions.getAction(spec.name)).toBeInstanceOf(Action);
      const action = actions.getAction(spec.name);
      expect(action.name).toBe(spec.name);
      expect(action.handler).toBe(spec.handler);
    });

    it('should add action using action spec with optional parameters', () => {
      const spec = actionFullSpecs.ping;

      actions.addAction(spec);
      expect(actions.hasAction(spec.name)).toBe(true);
      expect(actions.getAction(spec.name)).toBeInstanceOf(Action);
      const action = actions.getAction(spec.name);
      expect(action.name).toBe(spec.name);
      expect(action.version).toBe(spec.version);
      expect(action.description).toBe(spec.description);
      expect(action.type).toBe(spec.type);
      expect(action.handler).toBe(spec.handler);
    });

    it('should not allow action with same name', () => {
      const spec1: any = actionSpecs.ping;
      const spec2: any = actionSpecs.ping;

      actions.addAction(spec1);
      expect(() => actions.addAction(spec2))
      .toThrow(`${spec2.name} action already exist.`);
    });

  });

  describe('hasAction', () => {

    it('should return false for actions that does not exist', () => {
      expect(actions.hasAction('non-existent-action')).toBe(false);
    });

    it('should return true for actions that exist', () => {
      const spec: any = actionSpecs.ping;
      actions.addAction(spec);
      expect(actions.hasAction(spec.name)).toBe(true);
    });

  });

  describe('getAction', () => {

    it('should return action instance when exist', () => {
      const spec: any = actionSpecs.ping;

      actions.addAction(spec);
      expect(actions.getAction(spec.name)).toBeInstanceOf(Action);
    });

    it('should throw when action does not exist', () => {
      expect(
        () => actions.getAction('non-existent-action'),
      ).toThrow('non-existent-action action does not exist.');
    });

  });

  describe('getActions', () => {

    it('should return all added actions as map of action name => Action', () => {
      const spec1: any = actionSpecs['math.add'];
      const spec2: any = actionSpecs['math.multiply'];

      expect(Object.keys(actions.getActions()).length).toEqual(0);

      actions.addAction(spec1);
      actions.addAction(spec2);
      const returnedActions = actions.getActions();
      expect(Object.keys(returnedActions).length).toBe(2);
      expect(returnedActions[spec1.name]).toBeInstanceOf(Action);
      expect(returnedActions[spec2.name]).toBeInstanceOf(Action);
    });

  });
});
