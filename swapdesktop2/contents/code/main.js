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
    // Create a new desktop at index
    workspace.createDesktop(index, "New Desktop");
}


function add_desktop(relative_index) {
    // Create a new virtual desktop relative to current index
    add_desktop_abs(get_current_desktop_index() + relative_index);
}


function swap_desktops_abs(index1, index2) {
    // Swaps to desktops at specified indices
    // Doesn't check if desktops at those indices exist
    desktop1 = workspace.desktops[index1];
    workspace.desktops[index1] = workspace.desktops[index2];
    workspace.desktops[index2] = desktop1;
}


function swap_desktops(relative_index) {
    // Swap desktops
    current_index = get_current_desktop_index();
    new_index = current_index + relative_index;

    if (new_index < 0) {
        print('to be implemented');
    } else if (new_index >= workspace.desktops.length) {
        add_desktop_abs(workspace.desktops.length);
        print('to be implemented');
    } else {
        swap_desktops_abs(current_index, new_index);
    }
}


if (registerShortcut) {                                         /* Check if the register function actually exists */
    
    registerShortcut("Swap with Next Desktop",                  /* Register shortcut for 'swap with next desktop' */
                     "swapdesktop2: Swap current desktop with next one (temp)",
                     "Meta+Shift+Alt+Right",
                     function() {swap_desktop(1);});
    
    registerShortcut("Swap with Previous Desktop",              /* Register shortcut for 'swap with previous desktop' */
                     "swapdesktop2: Swap current desktop with previous one (temp)",
                     "Meta+Shift+Alt+Left",
                     function() {swap_desktop(-1);});

    registerShortcut("Swap with Above Desktop",                 /* Register shortcut for 'swap with above desktop' */
                     "swapdesktop2: Swap current desktop with one above (temp)",
                     "Meta+Shift+Alt+Up",
                     function() {swap_desktop(-workspace.desktopGridWidth);});
    
    registerShortcut("Swap with Below Desktop",                 /* Register shortcut for 'swap with below desktop' */
                     "swapdesktop2: Swap current desktop with one below (temp)",
                     "Meta+Shift+Alt+Down",
                     function() {swap_desktop(workspace.desktopGridWidth);});
    
    registerShortcut("Add Desktop After Current",                             /* Register shortcut for 'add desktop' */
                     "swapdesktop2: Add new desktop between current and next (temp)",
                     "Meta+Alt++",
                     function() {add_desktop(1);});
    
    registerShortcut("Add Desktop Before Current",                             /* Register shortcut for 'add desktop' */
                     "swapdesktop2: Add new desktop between previous and current (temp)",
                     "Meta+Alt+=",
                     function() {add_desktop(0);});

    registerShortcut("Remove Desktop",                          /* Register shortcut for 'remove desktop' */
                     "swapdesktop2: Remove current desktop and move its windows to the next (temp)",
                     "Meta+Alt+-",
                     function() {workspace.removeDesktop(workspace.currentDesktop);});
}
