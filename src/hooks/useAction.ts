import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as ActionCreatorsCards from '../store/action-creators/cards'
import * as ActionCreatorsStatistics from '../store/action-creators/statistics'

export const useActions = () => {
  const dispatch = useDispatch();
  // через запятую можно записывать
  return bindActionCreators({...ActionCreatorsCards, ...ActionCreatorsStatistics}, dispatch);
}
