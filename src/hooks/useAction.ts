import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as ActionCreatorsCards from '../store/action-creators/cards'
import * as ActionCreatorsStatistics from '../store/action-creators/statistics'
import * as ActionCreatorsAuth from '../store/action-creators/auth'

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({...ActionCreatorsCards, ...ActionCreatorsStatistics, ...ActionCreatorsAuth}, dispatch);
}
