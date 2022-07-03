from distutils.debug import DEBUG
from distutils.log import WARN
import logging


class Defines():
    isDebugversion = True


logging.basicConfig(
    level=logging.DEBUG if Defines.isDebugversion else logging.WARN)
