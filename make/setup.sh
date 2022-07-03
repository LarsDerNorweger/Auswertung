#!/bin/bash
if [ "$EUID" -ne 0 ]
then echo "Please run as root">&2
    exit
fi

function Dialog()
{
    read -p "Do you wish to make this program? [y/n] :" inp
    case $inp in
        [Yy]* ) echo "install";;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
}

echo "*** Docker Installing Menu ***"
echo "[1] remove 'node'"
echo "[2] install 'node'"
echo "[3] update 'node'"
echo ""

read -p "Option: " inp



case $inp in
    1)
        Dialog
        echo "remove both"
        apt -y remove nodejs
        sudo apt -y autoremove
    ;;
    2)
        Dialog
        apt -y install nodejs
        sudo apt -y autoremove
    ;;
    3)
        Dialog
        apt -y update nodejs
        sudo apt -y autoremove
    ;;
    *)
        echo "no valid input"
    exit;;
esac