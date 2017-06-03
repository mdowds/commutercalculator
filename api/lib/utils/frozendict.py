from typing import Any

import frozendict as fd


class frozendict(fd.frozendict):
    def add(self, key: Any, value: Any):
        return frozendict({**self._dict, **{key: value}})
