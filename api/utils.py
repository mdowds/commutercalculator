from datetime import date, timedelta
from typing import Dict, Any, Sequence, Callable, Tuple
from api.lib.functional import curried, reduce

generic_func = Callable[[Any], Any]


@curried
def dict_path(keys: Sequence[Any], input_dict: Dict[Any, Any]) -> Any:
    def select(dictionary, key):
        try: return dictionary[key]
        except (KeyError, TypeError, IndexError): return None

    return reduce(select, keys, input_dict)


def secs_to_mins(value_in: int) -> int:
    return int(round(value_in / 60, 0))


def create_error(message: str) -> Dict[str, str]:
    return {"error": message}


@curried
def map_(func: generic_func, seq: Sequence) -> Tuple:
    return tuple(map(func, seq))


@curried
def filter_(func: Callable[[Any], bool], seq: Sequence) -> Tuple:
    return tuple(filter(func, seq))


def find(func: Callable[[Any], bool], seq: Sequence) -> Any:
    return next(filter(func, seq))


def next_weekday(base_date: date) -> date:

    def is_weekday(date_to_check: date) -> bool:
        return date_to_check.weekday() in range(0, 5)

    next_date = base_date + timedelta(1)
    return next_date if is_weekday(next_date) else next_weekday(next_date)
