import json
import os
from typing import Dict, Any

_FILENAME = os.path.join(os.path.dirname(__file__), "config.json")


def load_config_value(key: str) -> str:
    try:
        config = _load_config()
    except FileNotFoundError as err:
        _create_config_file({'gmapsApiKey': ''})
        raise KeyError("Config value not found") from err

    return config[key]


def _load_config() -> Dict[str, Any]:
    try:
        file = open(_FILENAME)
    except FileNotFoundError:
        raise

    config_data = json.load(file)
    file.close()
    return config_data


def _create_config_file(structure: Dict):
    try:
        outfile = open(_FILENAME, 'w')
        json.dump(structure, outfile, indent=2)
        outfile.close()
    except IOError:
        raise
