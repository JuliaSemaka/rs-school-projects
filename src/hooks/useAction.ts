import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as ActionCreatorsCards from '../store/action-creators/cards'

export const useActions = () => {
  const dispatch = useDispatch();
  // через запятую можно записывать
  return bindActionCreators({...ActionCreatorsCards}, dispatch);
}
