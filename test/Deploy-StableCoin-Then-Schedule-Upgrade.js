const { exec } = require('child_process');

DeployScript =  exec('truffle test test/DeplyStableCoin.js',
(error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
        console.log(`exec error: ${error}`);
    }
});
setTimeout(StartUpgradeCycle, 10000); // Give it some time before looking at the upgrade

async function StartUpgradeCycle() {
var i=0;
    while (i++ < 4)
    {
        TodaysDate = new Date();
//        console.log('This is the Todays Date: '+ TodaysDate);

        ThisYear = TodaysDate.getFullYear();
        ThisMonth = TodaysDate.getMonth() ;
        Today = TodaysDate.getDate();
        UpgradeDay= 1;
        if (ThisMonth >= 12){
            UpgradeMonth = 1;
            UpgradeYear = ThisYear +1;
        }
        else
        {
    //        console.log('This is the ThisMonth: '+ ThisMonth);
            UpgradeMonth = ThisMonth+1;
            UpgradeYear = ThisYear;
        }
        UpgradeDate = new Date(UpgradeYear, UpgradeMonth, UpgradeDay);
        TimeToUpgrade = UpgradeDate.getTime() - TodaysDate.getTime();
        console.log(i + ' Todays Date: '+ TodaysDate);
        console.log(i + ' Next Upgrade Date: '+ UpgradeDate);

        console.log(i + ' Time Until the next Upgrade: ', TimeToUpgrade + " Milliseconds");
        await sleep(TimeToUpgrade);
        ScheduleUpgrade();

    }
    console.log(i + ' Finished the Cycle ******************************************');

}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 
function ScheduleUpgrade() {
    // all the stuff you want to happen after that pause
    console.log('In the ScheduleUpgrade function: ');
    var UpgradeScript = exec('truffle test test/DeplyStableCoinUpgrade.js',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
/*          const timerObj = setTimeout(() => {
            //console.log('===>> timeout beyond time');
          }, 60000);
*/        console.log('Leaving the ScheduleUpgrade function: ');
        //console.log('Blah blah blah blah extra-blah: ' ,  UpgradeDate.getTime() -  TodaysDate.getTime());
}

// call the rest of the code and have it execute after 3 seconds


//console.log("This is the localDate: " + start); // Gives day count of difference
