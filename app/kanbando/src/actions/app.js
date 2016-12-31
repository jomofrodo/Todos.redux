import uuid from 'node-uuid';

export const RESET_APP = 'RESET_APP';
export function resetApp() {
  return {
    type: RESET_APP
  };
};


