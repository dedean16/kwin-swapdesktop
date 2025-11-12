/*
*   Copyright (c) 2025 Daniël Cox <danielcox16@gmail.com>
*
*   This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU Lesser General Public License as published by
*   the Free Software Foundation; either version 3.0 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*/


function get_current_desktop_index() {
    // Return index of current desktop
    var current_index = workspace.desktops.indexOf(workspace.currentDesktop);
    return current_index;
}


function count_windows_on_desktop_abs(index) {
    // Count the number of windows on the desktop at the given absolute index
    
    // Initialize
    var all_desktops = workspace.desktops;
    var all_windows = workspace.windowList();
    var num_windows = 0;

    // Loop over windows and count which ones belong to given desktop
    for (var w = 0; w<all_windows.length; w++) {
        var window = all_windows[w];
        if (window.desktops[0] == all_desktops[index]) {
            num_windows++;
        }
    }

    return num_windows;
}


function add_desktop_abs(index) {
    // Create a new desktop at index (absolute)
    workspace.createDesktop(index, "New Desktop");
}


function add_desktop(relative_index) {
    // Create a new virtual desktop relative to current index
    add_desktop_abs(get_current_desktop_index() + relative_index);
}


function remove_current_desktop(relative_index) {
    // Remove the current desktop and move its windows to the given relative index, and focus that desktop

    // Compute new desktop index
    var new_index = get_current_desktop_index() + relative_index;
    if (new_index < 0) {
        new_index = 1;      // Note: desktop 0 will be deleted
    } else if (new_index >= workspace.desktops.length) {
        new_index = workspace.desktops.length - 2;      // Note: desktop length-1 will be deleted
    }

    // Initialize
    var all_desktops = workspace.desktops;
    var all_windows = workspace.windowList();
    var current_desktop_windows = [];
    var destination_desktop = all_desktops[new_index];
    var desktop_to_be_removed = workspace.currentDesktop;

    // Loop over windows and move the ones from current to destination
    for (var w = 0; w<all_windows.length; w++) {
        var window = all_windows[w];
        if (window.desktops[0] == workspace.currentDesktop) {
            window.desktops[0] = destination_desktop;
        }
    }

    // Set new current desktop
    workspace.currentDesktop = destination_desktop;

    // Remove the desktop
    workspace.removeDesktop(desktop_to_be_removed);
}


function swap_desktop_abs(index1, index2) {
    // Checks all windows and swaps desktops at given indices (absolute)
    // Note: Doesn't check if desktops at those indices exist

    // Initialize
    var all_desktops = workspace.desktops;
    var all_windows = workspace.windowList();
    var desktop1_windows = [];
    var desktop2_windows = [];
    var desktop1 = all_desktops[index1];
    var desktop2 = all_desktops[index2];

    // Make lists of windows on desktop1 and desktop2
    for (var w = 0; w<all_windows.length; w++) {
        var window = all_windows[w];
        if (window.desktops[0] == desktop1) {
            desktop1_windows.push(window);
        } else if (window.desktops[0] == desktop2) {
            desktop2_windows.push(window);
        }
    }

    // Swap desktop of the relevant windows
    desktop1_windows.forEach(function (window) {window.desktops[0] = desktop2});
    desktop2_windows.forEach(function (window) {window.desktops[0] = desktop1});
}


function swap_desktop(relative_index) {
    // Add desktop if required, swap desktops, focus swapped desktop


    // ==== Initialize ==== //
    var current_index = get_current_desktop_index();
    var new_index = current_index + relative_index;

    // Check if Dynamic Desktops mode is enabled. If enabled, empty desktops are added/removed automatically when swapping the first or last one.
    var doDynamicDesktopSwap = readConfig("dynamicDesktopSwap", true);


    // ==== Deal with edge cases ==== //
    // Add leading desktop to make swap possible, if required. (Or block at first/last if Dynamic Desktops is off.)
    if (new_index == -1 && doDynamicDesktopSwap) {
        add_desktop_abs(0);
        current_index++;
        new_index++;

    // Add trailing desktop to make swap possible, if required. (Or block at first/last if Dynamic Desktops is off.)
    } else if (new_index == workspace.desktops.length && doDynamicDesktopSwap) {
        add_desktop_abs(workspace.desktops.length);

    // Swapping over first/last desktop is blocked when dynamic desktops is off
    } else if ((new_index == -1 || new_index == workspace.desktops.length) && !doDynamicDesktopSwap){
        return;

    // Swapping to non-existing desktops is not supported (except optionally for index==-1 and index==last, see previous cases)
    } else if (new_index < -1 || new_index > workspace.desktops.length) {
        return;
    }


    // ==== Swap ==== //
    swap_desktop_abs(current_index, new_index);                 // Swap windows of desktops
    workspace.currentDesktop = workspace.desktops[new_index];   // Update current desktop index


    // ==== Dynamic remove empty leading/trailing ==== //
    if (doDynamicDesktopSwap) {

        // If first desktop swapped back and Dynamic Desktop mode is on: remove empty
        if (current_index == 0 && new_index == 1) {
            if (count_windows_on_desktop_abs(current_index) == 0) {
                workspace.removeDesktop(workspace.desktops[current_index]);
            }

            // If last desktop swapped back and Dynamic Desktop mode is on: remove empty
        } else if (current_index == workspace.desktops.length-1 && new_index == workspace.desktops.length-2) {
            if (count_windows_on_desktop_abs(current_index) == 0) {
                workspace.removeDesktop(workspace.desktops[current_index]);
            }
        }
    }
}


if (registerShortcut) {    /* Check if the register function actually exists */
    
    registerShortcut("Swap windows with next desktop",
                     "swapdesktop2: Swap current desktop with next one",
                     "Meta+Shift+Alt+Right",
                     function() {swap_desktop(1);});

    registerShortcut("Swap windows with previous desktop",
                     "swapdesktop2: Swap current desktop with previous one",
                     "Meta+Shift+Alt+Left",
                     function() {swap_desktop(-1);});

    registerShortcut("Swap with above desktop",
                     "swapdesktop2: Swap current desktop with one above",
                     "Meta+Shift+Alt+Up",
                     function() {swap_desktop(-workspace.desktopGridWidth);});

    registerShortcut("Swap with below desktop",
                     "swapdesktop2: Swap current desktop with one below",
                     "Meta+Shift+Alt+Down",
                     function() {swap_desktop(workspace.desktopGridWidth);});

    registerShortcut("Add desktop after current",
                     "swapdesktop2: Add new desktop between current and next",
                     "Meta+Alt++",
                     function() {add_desktop(1);});

    registerShortcut("Add desktop before current",
                     "swapdesktop2: Add new desktop between previous and current",
                     "Meta+Alt+=",
                     function() {add_desktop(0);});

    registerShortcut("Remove desktop, move windows to previous",
                     "swapdesktop2: Remove current desktop and move its windows to the next",
                     "Meta+Alt+_",
                     function() {remove_current_desktop(1);});

    registerShortcut("Remove desktop, move windows to next",
                     "swapdesktop2: Remove current desktop and move its windows to the previous",
                     "Meta+Alt+-",
                     function() {remove_current_desktop(-1);});
}
