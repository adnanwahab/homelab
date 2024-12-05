#
# Licensed under 3-Clause BSD license available in the License file. Copyright (c) 2022 iRobot Corporation. All rights reserved.
#

from irobot_edu_sdk.backend.bluetooth import Bluetooth
from irobot_edu_sdk.robots import event, hand_over, Color, Robot, Root, Create3
from irobot_edu_sdk.music import Note

print("starting roomba")
robot = Create3(Bluetooth())

POLL_SENSOR = True  # Try changing this to compare the speed of events vs polling


@event(robot.when_play)
async def handle_play(robot):
    # Trigger an undock and then dock. Try putting this in an infinite loop!
    print('Undock')
    undock_result = await robot.undock()
    print('Undock Result:', undock_result)
    
    print('Dock')
    dock_result = await robot.dock()
    print('Dock Result:', dock_result)
    
    # Start the sensor monitoring after docking
    await monitor_sensors(robot)


async def monitor_sensors(robot):
    while True:
        if POLL_SENSOR:
            docking_values = await robot.get_docking_values()
            sensor = docking_values.get('IR sensor 0', 0)
        else:
            sensor = robot.docking_sensor.sensors[0]
            if sensor is None:  # no event yet received
                sensor = 0
        
        r = 255 * ((sensor & 8) / 8)
        g = 255 * ((sensor & 4) / 4)
        b = 255 * (sensor & 1)
        await robot.set_lights_on_rgb(r, g, b)
        await asyncio.sleep(0.1)  # Add a short delay to prevent tight loop


robot.play()