import json
import os
from functools import reduce
from typing import Dict, Any, Sequence, Callable, Union

generic_func = Callable[[Any], Any]


def dict_value(keys: Sequence[Any], input_dict: Dict[Any, Any]) -> Union[Dict[Any, Any], None]:
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
