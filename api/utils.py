from typing import Dict, Any, Sequence
import os
import json


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
