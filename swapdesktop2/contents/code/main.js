/*
*   Copyright (c) 2024 Daniël Cox <danielcox16@gmail.com>
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
        new_index = 0
    } else if (new_index >= workspace.desktops.length) {
        new_index = workspace.desktops.length - 1;
    }

    // Initialize
    var all_desktops = workspace.desktops;
    var all_windows = workspace.windowList();
    var current_desktop_windows = [];
    var destination_desktop = all_desktops[new_index];

    // Make lists of windows on current desktop
    for (var w = 0; w<all_windows.length; w++) {
       var window = all_windows[w];
        if (window.desktops[0] == workspace.currentDesktop) {
            window.desktops[0] = destination_desktop;
        }
    }

    // Remove the desktop
    workspace.removeDesktop(workspace.currentDesktop);
}


function swap_desktop_abs(index1, index2) {
    // Checks all windows and swaps desktops at given indices (absolute)
    // Note: Doesn't check if desktops at those indices exist

    // Initialize
    all_desktops = workspace.desktops;
    all_windows = workspace.windowList();
    desktop1_windows = [];
    desktop2_windows = [];
    desktop1 = all_desktops[index1];
    desktop2 = all_desktops[index2];

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
    current_index = get_current_desktop_index();
    new_index = current_index + relative_index;

    // Add new desktop to make swap possible, if required
    if (new_index < 0) {
        add_desktop_abs(0);
        current_index++;
        new_index++;
    } else if (new_index == workspace.desktops.length) {
        add_desktop_abs(workspace.desktops.length);
    }

    swap_desktop_abs(current_index, new_index);

    workspace.currentDesktop = workspace.desktops[new_index];
}


if (registerShortcut) {    /* Check if the register function actually exists */
    
    registerShortcut("Swap windows with next desktop (temp5)",
                     "swapdesktop2: Swap current desktop with next one (temp5)",
                     "Meta+Shift+Alt+Right",
                     function() {swap_desktop(1);});

    registerShortcut("Swap windows with previous desktop (temp5)",
                     "swapdesktop2: Swap current desktop with previous one (temp5)",
                     "Meta+Shift+Alt+Left",
                     function() {swap_desktop(-1);});

    registerShortcut("Swap with above desktop (temp5)",
                     "swapdesktop2: Swap current desktop with one above (temp5)",
                     "Meta+Shift+Alt+Up",
                     function() {swap_desktop(-workspace.desktopGridWidth);});

    registerShortcut("Swap with below desktop (temp5)",
                     "swapdesktop2: Swap current desktop with one below (temp5)",
                     "Meta+Shift+Alt+Down",
                     function() {swap_desktop(workspace.desktopGridWidth);});

    registerShortcut("Add desktop after current (temp5)",
                     "swapdesktop2: Add new desktop between current and next (temp5)",
                     "Meta+Alt++",
                     function() {add_desktop(1);});

    registerShortcut("Add desktop before current (temp5)",
                     "swapdesktop2: Add new desktop between previous and current (temp5)",
                     "Meta+Alt+=",
                     function() {add_desktop(0);});

    registerShortcut("Remove desktop, move windows to previous (temp5)",
                     "swapdesktop2: Remove current desktop and move its windows to the previous (temp5)",
                     "Meta+Alt+_",
                     function() {remove_current_desktop(1);});

    registerShortcut("Remove desktop, move windows to next (temp5)",
                     "swapdesktop2: Remove current desktop and move its windows to the next (temp5)",
                     "Meta+Alt+-",
                     function() {remove_current_desktop(-1);});
}
