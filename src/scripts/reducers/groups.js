import * as types from '../constants';

const initialState = {
  data: {}
};

const groups = (state = initialState, action) => {
  switch (action.type) {

    case types.ADD_CHARTS: {

      const data = {...state.data};

      for (let i = 0; i < action.items.length; i++) {

        const item = action.items[i];

        const group = 'g' + item.group;

        if (!data[group]) {
          data[group] = [];
        }

        const id = group + '_' + item.asset.replace('/', '-').toLowerCase();

        data[group].push(id);
      }

      return {
        ...state,
        data: data
      }
    }

    case types.REMOVE_CHARTS:

      const existingState = {...state};

      const group = 'g0';

      const ids = action.items.map((item) => {
        return (group + '_' + item.asset.replace('/', '-').toLowerCase());
      });

      const newIds = existingState.data[group].filter((id) => {
        return !ids.includes(id);
      });

      existingState.data[group] = newIds;

      return existingState;

    default:
      return state;

  }
}

export default groups;
