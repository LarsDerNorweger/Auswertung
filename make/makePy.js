
const { spawn, spawnSync, exec } = require('child_process');
const fs = require('fs');



function watcher(file)
{

    let timeout = undefined;
    let process = undefined;
    fs.watch(file, { recursive: true }, (action, file) =>
    {

        if (timeout !== undefined)
        {
            clearTimeout(timeout);
            timeout = undefined;
        }

        if (timeout == undefined)
        {
            timeout = setTimeout(() =>
            {
                console.log(file, action);
                if (process !== undefined)
                {
                    process.kill();
                    process = undefined;
                }
                if (process == undefined)
                {
                    process = exec('python3 ./loader/main.py', (e, out) =>
                    {
                        if (e)
                            console.log('Error:\n', e);
                        else
                            console.log('Python:\n', out);
                    });
                }

                timeout = undefined;
            }, 100);
        }



    });
}

watcher('./loader');
