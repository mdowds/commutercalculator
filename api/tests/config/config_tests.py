import unittest
from unittest.mock import patch
from api.config.config import *


class ConfigTests(unittest.TestCase):

    @patch("api.config.config._load_config")
    def test_load_config_value(self, mock_lc):
        mock_lc.return_value = {'foo': 'bar'}
        self.assertEqual("bar", load_config_value("foo"))

    @patch("api.config.config._load_config")
    def test_load_config_value_no_key(self, mock_lc):
        mock_lc.return_value = {'foo': 'bar'}
        self.assertRaises(KeyError, load_config_value, 'nonexistent')

    @patch("api.config.config._create_config_file")
    @patch("api.config.config._load_config")
    def test_load_config_value_no_file(self, mock_lc, mock_ccf):
        mock_lc.side_effect = FileNotFoundError
        self.assertRaises(KeyError, load_config_value, 'foo')
