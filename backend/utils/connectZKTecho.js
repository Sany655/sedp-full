const Zkteco = require("zkteco-js");

const manageZktecoDevice = async () => {
    const device = new Zkteco("192.168.1.106", 4370, 5200, 5000);
    console.log('trying to connect')
    try {
        // Create socket connection to the device
        await device.createSocket();

        // Retrieve and log all attendance records
        const attendanceLogs = await device.getAttendances();
        console.log(attendanceLogs);

        // Listen for real-time logs
        await device.getRealTimeLogs((realTimeLog) => {
            console.log(realTimeLog);
        });

        // Manually disconnect after using real-time logs
        await device.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

module.exports = { manageZktecoDevice };