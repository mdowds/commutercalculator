import json
import os
from typing import Dict, Any, Sequence, Callable, Union, Tuple
from api.lib.functional import curried, reduce

generic_func = Callable[[Any], Any]


@curried
def dict_value(keys: Sequence[Any], input_dict: Dict[Any, Any]) -> Any:
    def select(dictionary, key):
        try: return dictionary[key]
        except (KeyError, TypeError, IndexError): return None

    return reduce(select, keys, input_dict)


def secs_to_mins(value_in: int) -> int:
    return int(round(value_in / 60, 0))


def load_config_value(key: str) -> str:
    config_path = os.path.join(os.getcwd(), "config", "config.json")

    try: data_file = open(config_path)
    except FileNotFoundError as err: raise err

    data = json.loads(data_file.read())
    data_file.close()

    return data[key]


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
