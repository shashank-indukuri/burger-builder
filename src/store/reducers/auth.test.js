import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false
        };
    });
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });
    it('should update token when Auth success', () => {
        expect(reducer(initialState, { type: 'AUTH_SUCCESS', idToken: 'some-token', userId: 'some-user' })).toEqual({
            token: 'some-token',
            userId: 'some-user',
            error: null,
            loading: false
        })
    });
})