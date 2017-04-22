from typing import Dict, Any, Sequence, Callable
import os
import json
from functools import reduce


def dict_value(keys: Sequence[Any], input_dict: Dict[Any, Any]):
    current = input_dict
    for key in keys:
        current = current[key]
    return current


def secs_to_mins(value_in: int) -> int:
    return int(round(value_in / 60, 0))


def load_config_value(key: str) -> str:
    config_path = os.path.join(os.getcwd(), "config", "config.json")

    try:
        data_file = open(config_path)
    except FileNotFoundError as err:
        raise err

    data = json.loads(data_file.read())
    data_file.close()

    return data[key]


generic_func = Callable[[Any], Any]
def pipeline(*functions: generic_func) -> generic_func:
    def pipeline2(f: generic_func, g: generic_func) -> generic_func:
        return lambda x: g(f(x))
    return reduce(pipeline2, functions, lambda x: x)
