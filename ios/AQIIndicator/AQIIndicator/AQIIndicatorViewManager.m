//
//  AQIIndicatorViewManager.m
//  AQIIndicator
//
//  Created by maciaszk on 01/11/16.
//  Copyright © 2016 Note B. All rights reserved.
//

#import "AQIIndicatorViewManager.h"
#import "AQIIndicator.h"
#import "RCTBridge.h"
#import <UIKit/UIKit.h>

@implementation AQIIndicatorViewManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
    AQIIndicator * theView;
    theView = [[AQIIndicator alloc] init];
    return theView;
}

RCT_EXPORT_VIEW_PROPERTY(progress, float)
RCT_EXPORT_VIEW_PROPERTY(score, int)
RCT_EXPORT_VIEW_PROPERTY(thickness, float);

@end
